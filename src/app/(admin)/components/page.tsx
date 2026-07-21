"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/data-display/card/Card";
import { StatCard } from "@/components/data-display/stat-card/StatCard";
import { Table, TableHead, TableBody, TableRow, TableHeaderCell, TableCell } from "@/components/data-display/table/Table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/data-display/tabs/Tabs";
import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from "@/components/data-display/breadcrumb/Breadcrumb";
import { Button } from "@/components/ui/button/Button";
import { Badge } from "@/components/ui/badge/Badge";
import { Input } from "@/components/forms/input/Input";
import { Textarea } from "@/components/forms/textarea/Textarea";
import { Checkbox } from "@/components/forms/checkbox/Checkbox";
import { Radio, RadioGroup } from "@/components/forms/radio/Radio";
import { Switch } from "@/components/forms/switch/Switch";
import { Select, SelectItem } from "@/components/forms/select/Select";
import { Slider } from "@/components/forms/slider/Slider";
import { PasswordInput } from "@/components/forms/password-input/PasswordInput";
import { SearchInput } from "@/components/forms/search-input/SearchInput";
import { DatePicker } from "@/components/forms/date-picker/DatePicker";
import { FormField } from "@/components/forms/form-field/FormField";
import { Pagination } from "@/components/navigation/pagination/Pagination";
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@/components/overlay/modal/Modal";
import { DollarLineIcon, BoltIcon, GroupIcon } from "@/icons";
import { useState } from "react";

export default function ComponentsPage() {
  const [sliderValue, setSliderValue] = useState(50);
  const [searchValue, setSearchValue] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Component Library
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Preview of all available UI components organized by category
        </p>
      </div>

      {/* Forms Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Forms & Inputs</h2>
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Form Components</h3>
            <p className="text-sm text-gray-500">Text inputs, selections, and controls</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Input Examples */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField label="Text Input" required>
                <Input placeholder="Enter text..." />
              </FormField>
              
              <FormField label="Password">
                <PasswordInput placeholder="Enter password" />
              </FormField>
              
              <FormField label="Search">
                <SearchInput 
                  placeholder="Search..." 
                  value={searchValue}
                  onChange={setSearchValue}
                />
              </FormField>
            </div>

            {/* Date Picker & Select */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Date Picker">
                <DatePicker 
                  placeholder="Select date"
                  value={selectedDate}
                  onChange={setSelectedDate}
                />
              </FormField>
              
              <FormField label="Select">
                <Select placeholder="Choose option...">
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </Select>
              </FormField>
            </div>

            {/* Textarea */}
            <FormField label="Textarea" helperText="Enter a description">
              <Textarea placeholder="Enter description..." />
            </FormField>

            {/* Slider */}
            <FormField label={`Slider Value: ${sliderValue}`}>
              <Slider 
                defaultValue={[sliderValue]} 
                onValueChange={(val) => setSliderValue(val[0])}
                max={100}
              />
            </FormField>

            {/* Checkboxes & Radios */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Checkboxes</label>
                <div className="space-y-2">
                  <Checkbox label="Accept terms and conditions" />
                  <Checkbox label="Subscribe to newsletter" defaultChecked />
                  <Checkbox label="Disabled option" disabled />
                </div>
              </div>
              
              <RadioGroup label="Radio Options">
                <Radio label="Option A" name="demo" value="a" />
                <Radio label="Option B" name="demo" value="b" />
                <Radio label="Option C" name="demo" value="c" />
              </RadioGroup>
            </div>

            {/* Switches */}
            <div className="flex items-center gap-4">
              <Switch 
                label="Notifications"
              />
              <Switch 
                label="Disabled"
                disabled
              />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Data Display Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Data Display</h2>
        
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Total Revenue"
            value="$45,231"
            icon={<DollarLineIcon className="h-6 w-6" />}
            iconColor="success"
            trend={{ value: 12.5, label: "vs last month" }}
          />
          <StatCard
            title="Total Users"
            value="2,350"
            icon={<BoltIcon className="h-6 w-6" />}
            iconColor="brand"
            trend={{ value: 8.2, label: "vs last month" }}
          />
          <StatCard
            title="Conversion Rate"
            value="3.24%"
            icon={<BoltIcon className="h-6 w-6" />}
            iconColor="warning"
            trend={{ value: -2.1, label: "vs last month" }}
          />
          <StatCard
            title="Active Sessions"
            value="1,429"
            icon={<GroupIcon className="h-6 w-6" />}
            iconColor="error"
            trend={{ value: 0, label: "No change" }}
          />
        </div>

        {/* Card Component */}
        <Card className="mb-6">
          <CardHeader>
            <h3 className="text-lg font-semibold">Card Component</h3>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              This is a versatile card component that can be used to display various types of content.
            </p>
          </CardContent>
          <CardFooter>
            <div className="flex gap-2">
              <Button size="sm">Action</Button>
              <Button size="sm" variant="outline">Cancel</Button>
            </div>
          </CardFooter>
        </Card>

        {/* Tabs */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <Tabs defaultValue="tab1">
              <TabsList>
                <TabsTrigger value="tab1">Overview</TabsTrigger>
                <TabsTrigger value="tab2">Analytics</TabsTrigger>
                <TabsTrigger value="tab3">Reports</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1">
                <p className="text-gray-600 dark:text-gray-400 py-4">
                  This is the overview tab content.
                </p>
              </TabsContent>
              <TabsContent value="tab2">
                <p className="text-gray-600 dark:text-gray-400 py-4">
                  Analytics data would appear here.
                </p>
              </TabsContent>
              <TabsContent value="tab3">
                <p className="text-gray-600 dark:text-gray-400 py-4">
                  Reports would appear here.
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Table Component</h3>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Name</TableHeaderCell>
                  <TableHeaderCell>Email</TableHeaderCell>
                  <TableHeaderCell>Role</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>John Doe</TableCell>
                  <TableCell variant="muted">john@example.com</TableCell>
                  <TableCell>Admin</TableCell>
                  <TableCell><Badge color="success">Active</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell variant="muted">jane@example.com</TableCell>
                  <TableCell>Editor</TableCell>
                  <TableCell><Badge color="warning">Pending</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Bob Wilson</TableCell>
                  <TableCell variant="muted">bob@example.com</TableCell>
                  <TableCell>Viewer</TableCell>
                  <TableCell><Badge color="error">Inactive</Badge></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      {/* Navigation Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Navigation</h2>
        
        {/* Breadcrumb */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <Breadcrumb>
              <BreadcrumbItem href="/">Home</BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem href="/components">Components</BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem isCurrentPage>Breadcrumb</BreadcrumbItem>
            </Breadcrumb>
          </CardContent>
        </Card>

        {/* Pagination */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Pagination</h3>
          </CardHeader>
          <CardContent>
            <Pagination
              currentPage={3}
              totalPages={10}
              onPageChange={(page) => console.log("Page:", page)}
            />
          </CardContent>
        </Card>
      </section>

      {/* Overlay Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Overlay</h2>
        
        <Card>
          <CardContent className="pt-6">
            <Modal open={modalOpen} onOpenChange={setModalOpen}>
              <ModalTrigger asChild>
                <Button>Open Modal</Button>
              </ModalTrigger>
              <ModalContent>
                <ModalHeader title="Modal Title">
                  <p className="text-sm text-gray-500">This is a modal dialog</p>
                </ModalHeader>
                <ModalBody>
                  <p className="text-gray-600 dark:text-gray-400">
                    This is the modal content. You can put any React component or content here.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
                  <Button variant="solid" onClick={() => setModalOpen(false)}>Confirm</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </CardContent>
        </Card>
      </section>

      {/* Buttons & Badges */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Primitives</h2>
        
        <Card className="mb-6">
          <CardHeader>
            <h3 className="text-lg font-semibold">Buttons</h3>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button>Primary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="solid" color="success">Success</Button>
              <Button variant="solid" color="error">Error</Button>
              <Button variant="solid" color="warning">Warning</Button>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button disabled>Disabled</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Badges</h3>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Badge>Default</Badge>
              <Badge color="primary">Primary</Badge>
              <Badge color="success">Success</Badge>
              <Badge color="error">Error</Badge>
              <Badge color="warning">Warning</Badge>
              <Badge color="info">Info</Badge>
              <Badge color="gray">Gray</Badge>
              <Badge size="sm">Small</Badge>
              <Badge size="md">Medium</Badge>
              <Badge size="lg">Large</Badge>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
